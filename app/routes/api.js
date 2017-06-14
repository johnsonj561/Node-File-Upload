module.exports = function (router, upload, fs, isValidPath) {

  /*
   * Create new directory if it doesn't already exist
   * Returns true if a new directory was created
   */
  router.post('/createDir', function (req, res) {
    var newDirectory = './uploads/' + req.body.newDirectory;
    if (req.body.newDirectory === undefined || req.body.newDirectory === "") { // verify valid input
      res.json({
        success: false,
        message: 'No directory name provided, unable to create new directory'
      });
    } else if (!isValidPath(newDirectory)) { // validate our new upload path
      res.json({
        success: false,
        message: 'Invalid path, unable to create new path ' + newDirectory
      });
    } else if (!fs.existsSync(newDirectory)) { // if directory does not exist, then create it and return success
      fs.mkdirSync(newDirectory);
      res.json({
        success: true,
        message: 'New directory ' + newDirectory + ' created successfully'
      });
    } else { // else directory exists, return error
      res.json({
        success: false,
        message: 'Directory ' + newDirectory + ' already exists.'
      });
    }
  });

  /*
   * Get list of directoriries found within root path
   * Returns false if no root path is provided or if root path can not be found
   */
  router.get('/dirList/:rootDir', function (req, res) {
    var rootDir = req.params.rootDir;
    if (rootDir === 'undefined') { // if rootDir was not provided, return error
      res.json({
        success: false,
        message: 'No root path provided for search. Please provide a root path to begin searching'
      });
    } else if (!fs.existsSync(rootDir)) { // else if rootDir does not exist, return error
      res.json({
        success: false,
        message: 'The path directory path you provided can not be found. Please provide a valid path path to begin searching'
      });
    } else { // filter out the directories and return result
      var directories = fs.readdirSync(rootDir)
        .filter(function (file) {
          return fs.lstatSync(rootDir + '/' + file).isDirectory();
        });
      res.json({
        success: true,
        result: directories
      });
    }
  });


  /*
   * Upload single image to server
   */
  router.post('/upload', upload.single('file'), function (req, res) {
    console.log("Data written successfully!");
    if (req.file) {
      console.log(req.file);
      res.json({
        success: true
      });
    } else {
      res.json({
        success: false
      });
    }
  });


  return router;
}
