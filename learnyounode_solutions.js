//learnyounode select 0: HELLO WORLD

console.log("Hello World");

//learnyounode select 1: BABY STEPS

    /*Write a program that accepts one or more numbers as command-line arguments
      and prints the sum of those numbers to the console (stdout).*/

let result = 0

for (let i = 2; i < process.argv.length; i++) {
    result += Number(process.argv[i])
    }

console.log(result)

//learnyounode select 2: MY FIRST I/O!

    /*Write a program that uses a single synchronous filesystem operation to
     read a file and print the number of newlines (\n) it contains to the
     console (stdout), similar to running cat file | wc -l.
     The full path to the file to read will be provided as the first
     command-line argument (i.e., process.argv[2]). You do not need to make
     your own test file.*/

     const fs = require('fs')

     const contents = fs.readFileSync(process.argv[2])
     const lines = contents.toString().split('\n').length - 1
     console.log(lines)


//learnyounode select 3: MY FIRST ASYNC I/O!

    /*Write a program that uses a single asynchronous filesystem operation to
      read a file and print the number of newlines it contains to the console
      (stdout), similar to running cat file | wc -l.
      The full path to the file to read will be provided as the first
      command-line argument.
    */

    const fs = require('fs')
    const file = process.argv[2]

    fs.readFile(file, function (err, contents) {
      if (err) {
        return console.log(err)
      }
      // fs.readFile(file, 'utf8', callback) can also be used
      const lines = contents.toString().split('\n').length - 1
      console.log(lines)
    })

//learnyounode select 4: FILTERED LS

    /*Create a program that prints a list of files in a given directory,
      filtered by the extension of the files. You will be provided a directory
      name as the first argument to your program (e.g. '/path/to/dir/') and a
      file extension to filter by as the second argument.

      For example, if you get 'txt' as the second argument then you will need to
      filter the list to only files that end with .txt. Note that the second
      argument will not come prefixed with a '.'.

      Keep in mind that the first arguments of your program are not the first
      values of the process.argv array, as the first two values are reserved for
      system info by Node.

      The list of files should be printed to the console, one file per line. You
      must use asynchronous I/O.
    */

    const fs = require('fs')
    const path = require('path')

    const folder = process.argv[2]
    const ext = '.' + process.argv[3]

    fs.readdir(folder, function (err, files) {
      if (err) return console.error(err)
      files.forEach(function (file) {
        if (path.extname(file) === ext) {
          console.log(file)
        }
      })
    })

//learnyounode select 5: MAKE IT MODULAR

    /*This problem is the same as the previous but introduces the concept of
     modules. You will need to create two files to solve this.

     Create a program that prints a list of files in a given directory,
     filtered by the extension of the files. The first argument is the
     directory name and the second argument is the extension filter. Print the
     list of files (one file per line) to the console. You must use
     asynchronous I/O.

     You must write a module file to do most of the work. The module must
     export a single function that takes three arguments: the directory name,
     the filename extension string and a callback function, in that order. The
     filename extension argument must be the same as what was passed to your
     program. Don't turn it into a RegExp or prefix with "." or do anything
     except pass it to your module where you can do what you need to make your
     filter work.

     The callback function must be called using the idiomatic node(err, data)
     convention. This convention stipulates that unless there's an error, the
     first argument passed to the callback will be null, and the second will be
     your data. In this exercise, the data will be your filtered list of files,
     as an Array. If you receive an error, e.g. from your call to
     fs.readdir(), the callback must be called with the error, and only the
     error, as the first argument.

     You must not print directly to the console from your module file, only
     from your original program.

     In the case of an error bubbling up to your original program file, simply
     check for it and print an informative message to the console.

     These four things are the contract that your module must follow.

      1. Export a single function that takes exactly the arguments described.
      2. Call the callback exactly once with an error or some data as described.
      3. Don't change anything else, like global variables or stdout.
      4. Handle all the errors that may occur and pass them to the callback.

     The benefit of having a contract is that your module can be used by anyone
     who expects this contract. So your module could be used by anyone else who
     does learnyounode, or the verifier, and just work.*/

     const fs = require('fs')
     const path = require('path')

     module.exports = function (dir, filterStr, callback) {
       fs.readdir(dir, function (err, list) {
         if (err) {
           return callback(err)
         }

         list = list.filter(function (file) {
           return path.extname(file) === '.' + filterStr
         })

         callback(null, list)
       })
     }


//learnyounode select 6: HTTP CLIENT
    /*Write a program that performs an HTTP GET request to a URL provided to you
     as the first command-line argument. Write the String contents of each
     "data" event from the response to a new line on the console (stdout).*/

     const http = require('http')

     http.get(process.argv[2], function (response) {
       response.setEncoding('utf8')
       response.on('data', console.log)
       response.on('error', console.error)
     }).on('error', console.error)

//learnyounode select 7: HTTP COLLECT
    /*Write a program that performs an HTTP GET request to a URL provided to you
    as the first command-line argument. Collect all data from the server (not
    just the first "data" event) and then write two lines to the console
    (stdout).

    The first line you write should just be an integer representing the number
    of characters received from the server. The second line should contain the
    complete String of characters sent by the server.*/

    const http = require('http')
    const bl = require('bl')

    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err) {
          return console.error(err)
        }
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))
    })


//learnyounode select 8: JUGGLING ASYNC

    /*This problem is the same as the previous problem (HTTP COLLECT) in that
      you need to use http.get(). However, this time you will be provided with
      three URLs as the first three command-line arguments.

      You must collect the complete content provided to you by each of the URLs
      and print it to the console (stdout). You don't need to print out the
      length, just the data as a String; one line per URL. The catch is that you
      must print them out in the same order as the URLs are provided to you as
      command-line arguments.*/

      const http = require('http')
      const bl = require('bl')
      const results = []
      let count = 0

      function printResults () {
        for (let i = 0; i < 3; i++) {
          console.log(results[i])
        }
      }

      function httpGet (index) {
        http.get(process.argv[2 + index], function (response) {
          response.pipe(bl(function (err, data) {
            if (err) {
              return console.error(err)
            }

            results[index] = data.toString()
            count++

            if (count === 3) {
              printResults()
            }
          }))
        })
      }

      for (let i = 0; i < 3; i++) {
        httpGet(i)
      }

//learnyounode select 9: TIME SERVER

    /*  Write a TCP time server!

  Your server should listen to TCP connections on the port provided by the
  first argument to your program. For each connection you must write the
  current date & 24 hour time in the format:

     "YYYY-MM-DD hh:mm"

  followed by a newline character. Month, day, hour and minute must be
  zero-filled to 2 integers. For example:

     "2013-07-06 17:42"

  After sending the string, close the connection.
  */

  const net = require('net')

  function zeroFill (i) {
    return (i < 10 ? '0' : '') + i
  }

  function now () {
    const d = new Date()
    return d.getFullYear() + '-' +
      zeroFill(d.getMonth() + 1) + '-' +
      zeroFill(d.getDate()) + ' ' +
      zeroFill(d.getHours()) + ':' +
      zeroFill(d.getMinutes())
  }

  const server = net.createServer(function (socket) {
    socket.end(now() + '\n')
  })

  server.listen(Number(process.argv[2]))

//learnyounode select 10: HTTP FILE SERVER

    /* Write an HTTP server that serves the same text file for each request it
      receives.

      Your server should listen on the port provided by the first argument to
      your program.

      You will be provided with the location of the file to serve as the second
      command-line argument. You must use the fs.createReadStream() method to
      stream the file contents to the response.
    */

    const http = require('http')
    const fs = require('fs')

    const server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })

      fs.createReadStream(process.argv[3]).pipe(res)
    })

    server.listen(Number(process.argv[2]))

//learnyounode select 11: HTTP UPPERCASERER

    /* Write an HTTP server that receives only POST requests and converts
      incoming POST body characters to upper-case and returns it to the client.

      Your server should listen on the port provided by the first argument to
      your program.
    */

    const http = require('http')
    const map = require('through2-map')

    const server = http.createServer(function (req, res) {
      if (req.method !== 'POST') {
        return res.end('send me a POST\n')
      }

      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })

    server.listen(Number(process.argv[2]))

//learnyounode select 12: HTTP JSON API SERVER

    /*Write an HTTP server that serves JSON data when it receives a GET request
      to the path '/api/parsetime'. Expect the request to contain a query string
      with a key 'iso' and an ISO-format time as the value.

      For example:

      /api/parsetime?iso=2013-08-10T12:10:15.474Z

      The JSON response should contain only 'hour', 'minute' and 'second'
      properties. For example:

         {
           "hour": 14,
           "minute": 23,
           "second": 15
         }

      Add second endpoint for the path '/api/unixtime' which accepts the same
      query string but returns UNIX epoch time in milliseconds (the number of
      milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
      For example:

         { "unixtime": 1376136615474 }

      Your server should listen on the port provided by the first argument to
      your program.*/

      const http = require('http')
      const url = require('url')

      function parsetime (time) {
        return {
          hour: time.getHours(),
          minute: time.getMinutes(),
          second: time.getSeconds()
        }
      }

      function unixtime (time) {
        return { unixtime: time.getTime() }
      }

      const server = http.createServer(function (req, res) {
        const parsedUrl = url.parse(req.url, true)
        const time = new Date(parsedUrl.query.iso)
        let result

        if (/^\/api\/parsetime/.test(req.url)) {
          result = parsetime(time)
        } else if (/^\/api\/unixtime/.test(req.url)) {
          result = unixtime(time)
        }

        if (result) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify(result))
        } else {
          res.writeHead(404)
          res.end()
        }
      })
      server.listen(Number(process.argv[2]))
