Why index.js in every folder?
COnsider you have tens of contrllers in every folder, to export all of them with a single import you can use tihis index file. Else case, you will have to write single import statement for every controller which will take multiple lines.

Why "/api/v1" ?
There are two type of routes, there are API routes and non API routes (like routes requesting for home page)

app.use()?
used to register middlewares for whole file
Also mount router function with urls

res.status() returns the same response object similarly res.json also return sthe same response object
Thus when we do res.status().json(), we get the same res