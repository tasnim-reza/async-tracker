import { IDeviceInfo } from "../interfaces/async-trace-sdk-types";

export class DeviceDetector {
    private unknown = '-';
    private nVer = navigator.appVersion;
    private nAgt = navigator.userAgent;
    private browser = navigator.appName;
    private version = '' + parseFloat(navigator.appVersion);
    private majorVersion = parseInt(navigator.appVersion, 10);
    private mobile = false;
    private screenSize = '';
    private os = this.unknown;
    private osVersion = this.unknown as any;
    private cookieEnabled = (navigator.cookieEnabled) ? true : false;

    constructor() {
        this.setScreenSizeIfPossible();
        this.setBrowserInfo();
        this.setCookieInfo();
        this.setOsInfo();
    }

    private setScreenSizeIfPossible() {
        if (window.screen.width) {
            const width = (screen.width) ? screen.width : '';
            const height = (screen.height) ? screen.height : '';
            this.screenSize += '' + width + " x " + height;
        }
    }

    private setBrowserInfo() {
        let nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = this.nAgt.indexOf('Opera')) != -1) {
            this.browser = 'Opera';
            this.version = this.nAgt.substring(verOffset + 6);
            if ((verOffset = this.nAgt.indexOf('Version')) != -1) {
                this.version = this.nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = this.nAgt.indexOf('OPR')) != -1) {
            this.browser = 'Opera';
            this.version = this.nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = this.nAgt.indexOf('Edge')) != -1) {
            this.browser = 'Microsoft Edge';
            this.version = this.nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = this.nAgt.indexOf('MSIE')) != -1) {
            this.browser = 'Microsoft Internet Explorer';
            this.version = this.nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = this.nAgt.indexOf('Chrome')) != -1) {
            this.browser = 'Chrome';
            this.version = this.nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = this.nAgt.indexOf('Safari')) != -1) {
            this.browser = 'Safari';
            this.version = this.nAgt.substring(verOffset + 7);
            if ((verOffset = this.nAgt.indexOf('Version')) != -1) {
                this.version = this.nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = this.nAgt.indexOf('Firefox')) != -1) {
            this.browser = 'Firefox';
            this.version = this.nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (this.nAgt.indexOf('Trident/') != -1) {
            this.browser = 'Microsoft Internet Explorer';
            this.version = this.nAgt.substring(this.nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = this.nAgt.lastIndexOf(' ') + 1) < (verOffset = this.nAgt.lastIndexOf('/'))) {
            this.browser = this.nAgt.substring(nameOffset, verOffset);
            this.version = this.nAgt.substring(verOffset + 1);
            if (this.browser.toLowerCase() == this.browser.toUpperCase()) {
                this.browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = this.version.indexOf(';')) != -1) this.version = this.version.substring(0, ix);
        if ((ix = this.version.indexOf(' ')) != -1) this.version = this.version.substring(0, ix);
        if ((ix = this.version.indexOf(')')) != -1) this.version = this.version.substring(0, ix);

        this.majorVersion = parseInt('' + this.version, 10);
        if (isNaN(this.majorVersion)) {
            this.version = '' + parseFloat(navigator.appVersion);
            this.majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        this.mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(this.nVer);
    }

    private setCookieInfo() {
        if (typeof navigator.cookieEnabled == 'undefined' && !this.cookieEnabled) {
            document.cookie = 'testcookie';
            this.cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

    }

    private setOsInfo() {
        // system
        let clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Chrome OS', r: /CrOS/ },
            { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
        ];
        for (let id in clientStrings) {
            let cs = clientStrings[id];
            if (cs.r.test(this.nAgt)) {
                this.os = cs.s;
                break;
            }
        }
        let matches: any;
        if (/Windows/.test(this.os)) {
            matches = /Windows (.*)/.exec(this.os);
            this.osVersion = matches ? matches[1] : this.unknown;
            this.os = 'Windows';
        }

        switch (this.os) {
            case 'Mac OS X':
                matches = /Mac OS X (10[\.\_\d]+)/.exec(this.nAgt)
                this.osVersion = matches ? matches[1] : this.unknown;
                break;

            case 'Android':
                matches = /Android ([\.\_\d]+)/.exec(this.nAgt)
                this.osVersion = matches ? matches[1] : this.unknown;
                break;

            case 'iOS':
                this.osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(this.nVer);
                this.osVersion = this.osVersion[1] + '.' + this.osVersion[2] + '.' + (this.osVersion[3] | 0);
                break;
        }
    }

    /**
     * getDeviceInfo
     */
    public getDeviceInfo(): IDeviceInfo {
        return {
            screen: this.screenSize,
            browser: this.browser,
            browserVersion: this.version,
            browserMajorVersion: this.majorVersion,
            mobile: this.mobile,
            os: this.os,
            osVersion: this.osVersion,
            cookies: this.cookieEnabled
        }
    }
}
