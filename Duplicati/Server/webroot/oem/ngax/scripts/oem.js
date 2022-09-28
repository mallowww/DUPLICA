/* Placeholder for OEM branding */
// backupApp.service('s3fileman', function(FilemanBrandingService) {});
// backupApp.service('s3fileman', function(FilemanBrandingService) {
// 	FilemanBrandingService.state.appName = "s3 Fileman";
// 	FilemanBrandingService.state.appSubtitle = "s3.sran.net:9000"
// });

/* Custom backend config, s3 Fileman via ssh*/

// backupApp.service('OEMService', function(s3FilemanBackendService) {});
// backupApp.service('s3FilemanBackendService', function(EditUriBackendConfig, EditUriBuiltins, AppUtils) {
// 	var SERVER_HOST = 'https://s3.sran.net:9001/';
// 	var SERVER_PORT = 22;
// 	var SERVER_URL = 'ssh://' + SERVER_HOST + ':' + SERVER_PORT;

// 	EditUriBackendConfig.defaultbackend = 'ssh';
// 	// EditUriBackendConfig.templates['ssh'] = '../oem/ngax/templates/backends/s3fileman.html';
// 	EditUriBackendConfig.templates['ssh'] = '../oem/ngax/templates/backends/s4pun.html';

// 	EditUriBackendConfig.builders['ssh'] = function(scope) {
// 		var opts = {};
// 		EditUriBackendConfig.merge_in_advanced_options(scope, opts);
// 		var url = AppUtils.format('ssh://{0}/{1}{2}',
// 			SERVER_HOST + ':' + SERVER_PORT,
// 			scope.Path,
// 			AppUtils.encodeDictAsUrl(opts)
// 		);

// 		return url;
// 	};

// 	EditUriBackendConfig.validaters['ssh'] = function(scope, continuation) {
// 		if (EditUriBackendConfig.require_path(scope))
// 		{
// 		    if (!EditUriBackendConfig.require_username_and_password(scope))
// 		    	return;
// 		}
//     	    	continuation();
// 	};
// });

// 42 - 82, err-temp-pages


/*
backupApp.service('OEMService', function(s3FilemanBackendService) {});
backupApp.service('s3FilemanBackendService', function(EditUriBackendConfig, EditUriBuiltins, AppUtils) {
	var SERVER_HOST = 'https://s3.sran.net:9001/';
	var SERVER_PORT = 22;
    var SERVER_URL = 'https://s3.sran.net:9001/';
	//var SERVER_URL = 'ssh://' + SERVER_HOST + ':' + SERVER_PORT;

	EditUriBackendConfig.defaultbackend = 's3';
	EditUriBackendConfig.templates['s3'] = '../oem/ngax/templates/backends/s3fileman.html';

	EditUriBackendConfig.builders['s3'] = function(scope) {
		var opts = {};
		EditUriBackendConfig.merge_in_advanced_options(scope, opts);
		var url = AppUtils.format('ssh://{0}/{1}{2}',
			SERVER_HOST + ':' + SERVER_PORT,
			scope.Path,
			AppUtils.encodeDictAsUrl(opts)
		);
		// var url = AppUtils.format('ssh://{0}/{1}{2}',
		// 	SERVER_HOST + ':' + SERVER_PORT,
		// 	scope.Path,
		// 	AppUtils.encodeDictAsUrl(opts)
		// );

		return url;
	};

	EditUriBackendConfig.validaters['s3'] = function(scope, continuation) {
		if (EditUriBackendConfig.require_path(scope))
		{
		    if (!EditUriBackendConfig.require_username_and_password(scope))
		    	return;
		}
    	    	continuation();
	};
});
*/