**Ningen Card Game**

This is an ningen card game project. The project is mainly written in typescript language.

**Folder structure**

```
/test = unit test are written in this folder
/src/core = where the main source code is
/src/prototype = where the source code for stand alone prototype are
/prototype = where the resource of prototype are in
/prototype/{project} = each stand alone prototype have it own folder 
/coverage = where the test coverage will be stored.
/dist = where the generated javascript file are in
```

**Building**

The building is mostly done by gulpfile. Look at the package.json for example.
You can compile all the prototype by running ``prototype`` script. By running
``prototype`` , it use the ``prototype/gulpfile.js`` to generate the javascript
bundle file which can be run by browser

**Contributor's Guide**

The networking of the project should be done by websocket. I encourge you to write the unit test and take advantages of typescript type system.Try to use interface and glue the code together to make it work. Make it as abstact as you can.



