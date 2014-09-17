/**
 * JobController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(res, req) {
    var shapefile = require('shapefile');
    var reproject = require('reproject');
    var simplify = require('simplify-geojson');

    var shpFile = req.file('shpfile').upload(function(err, uploadedFiles) {
      if (err) return res.send(500, err);

      var geoJSONCollections = new Array();

      uploadedFiles.forEach(function(filename) {
        shapefile.read(filename, function(err, collection) {
          if (err) return res.send(500, err);
          geoJSONCollections.push(collection);
        });
      });

      var detectedCRS = reproject.detectCrs(geoJSONCollections);
      var fromCRS = (req.body.fromCRS ? req.body.fromCRS : detectedCRS);
      var geoJSONReprojected = reproject.reproject(geoJSONCollections, detectedCRS, req.body.toCRS);

      var simplified = simplify(geoJSONReprojected, req.body.simplifyTolerance);

      return res.json(simplified);
    });
  },


};
