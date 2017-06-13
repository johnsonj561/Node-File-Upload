module.exports = function (router, upload, fs) {

  /*
   * Create new directory if it doesn't already exist
   * Returns true if a new directory was created
   */
  router.post('/createDir/:newDirectory', function (req, res) {
    var newDirectory = './uploads/' + req.params.newDirectory;
    if (req.params.newDirectory === 'undefined' || req.params.newDirectory.length === 0) {
      res.json({
        success: false,
        message: 'No directory name provided, unable to create new directory'
      });
    }
    /* need to add validation
     * TODO
     */
    // if directory does not exist, create it
    else if (!fs.existsSync(newDirectory)) {
      fs.mkdirSync(newDirectory);
      res.json({
        success: true,
        message: 'New directory ' + req.params.newDirectory + ' created successfully'
      });
    } else {
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
    console.log('path found: ', rootDir);
    if (rootDir === 'undefined') {
      res.json({
        success: false,
        message: 'No root path provided for search. Please provide a root path to begin searching'
      });
    } else if (!fs.existsSync(rootDir)) {
      res.json({
        success: false,
        message: 'The path directory path you provided can not be found. Please provide a valid path path to begin searching'
      });
    } else {
      // filter out the directories and return result
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
