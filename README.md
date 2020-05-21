# Angular asynchronous error tracking tool.

Angular opensource dev tool for complete stacktrace and more

- [x] Full stacktrace
- [x] Clean stacktrace
- [ ] Event details
- [ ] Component dependency graph
- [ ] Report in production

# Get the code

Clone the repository: 

`git clone git@github.com:tasnim-reza/async-tracker.git`

# To build the application

From the command line

`cd async-tracker`

`npm run install:dependency`

`npm run example`

Open the browser (Chrome is preferred)

http://localhost:4200/

# Documentation

## What is it?

Writing asynchronous code is easy but solving an asynchronous bug is hard. So what is `asynchronous bug` and why it is so difficult to pinpoint? 

Asynchronous bug: When our call stack involves any of this functions `setimeout`,  `xmlhttprequest`,  `observable` we can say, our code is asynchronous. If we get an exception from any of these functions, then it boils down to an expensive asynchronous bug. 

Because of the nature of asynchronous code, the JavaScript runtime (V8) can not give us the full picture. When the exception happens it looses its outer context, except closures.

Why it is hard? I found one fundamental reason is, we can not see the complete picture. We can't link the button click and bug. If we look at the stacktraces, we can see there are a lot of stack frames are missing. What if we get the complete stacktrace then it wouldn't be that hard, right?

The motivation of `AsyncTracker` is to show the complete and clean stacktrace for any asynchronous or synchronous code. 

## How it works?

We know, Angular's change detection is rely on `zonejs`. If there is no `zonejs ` present in Angular execution context, we've to trigger the change detection manually. `zonejs` has a way to track task, using this facility the Angular team build a library called `long-stacktrace.js` If we include this library, In development mode, we can see the complete stacktrace but the stacktraces are not clean and I found it is not readable.

To create the `AsyncTracker`  I extends (https://github.com/tasnim-reza/async-tracker/blob/master/src/shared/async-trace-zone.ts) the `NgZone`  and forked a child zone. Within this child zone I added the task tracking hooks (https://github.com/tasnim-reza/async-tracker/blob/master/src/shared/async-trace-zone-spec.ts).

The rest of the work is easypeasy! For each task, generates the stacktrace (https://github.com/tasnim-reza/async-tracker/blob/master/src/shared/long-stacktrace.ts) and store them.  When any exception happened to any task, the execution is stopped and the runtime gives us the current error stack. Now we've to move backword and collects all the generated stacktraces, combined them, clean them and finally we get the complete stacktrace Hah! The following picture helps us to understand more clearly

![asynctracker concept](https://github.com/tasnim-reza/async-tracker/blob/master/example/show-dev-error/src/assets/demo/asynctracker-concept.PNG?raw=true)

## Demo

I added an example(https://github.com/tasnim-reza/async-tracker/tree/master/example/show-dev-error) to proof this concept. I explored two example one is `SetTimeout` and another one is `XMLHttpRequest`  Run the following command to run this example

`npm run example`

To generate error click `show live error` button and open developer console. Or see the following pictures to follow up.

### setTimeout example

![setTimeout example](https://github.com/tasnim-reza/async-tracker/blob/master/example/show-dev-error/src/assets/demo/demo1.PNG?raw=true)

### setTimeout console log

![setTimeout console log](https://github.com/tasnim-reza/async-tracker/blob/master/example/show-dev-error/src/assets/demo/demo2.PNG?raw=true)

### XMLHttpRequest example
![XMLHttpRequest example](https://github.com/tasnim-reza/async-tracker/blob/master/example/show-dev-error/src/assets/demo/demo3.PNG?raw=true)

### XMLHttpRequest console log
![XMLHttpRequest console log](https://github.com/tasnim-reza/async-tracker/blob/master/example/show-dev-error/src/assets/demo/demo4.PNG?raw=true)
