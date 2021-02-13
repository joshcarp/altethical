/**
 * @fileoverview gRPC-Web generated client stub for itproject
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.itproject = require('./api_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.authenticateClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.authenticatePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.registerRequest,
 *   !proto.itproject.registerResponse>}
 */
const methodDescriptor_authenticate_register = new grpc.web.MethodDescriptor(
  '/itproject.authenticate/register',
  grpc.web.MethodType.UNARY,
  proto.itproject.registerRequest,
  proto.itproject.registerResponse,
  /**
   * @param {!proto.itproject.registerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.registerResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.registerRequest,
 *   !proto.itproject.registerResponse>}
 */
const methodInfo_authenticate_register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.registerResponse,
  /**
   * @param {!proto.itproject.registerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.registerResponse.deserializeBinary
);


/**
 * @param {!proto.itproject.registerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.registerResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.registerResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.authenticateClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.authenticate/register',
      request,
      metadata || {},
      methodDescriptor_authenticate_register,
      callback);
};


/**
 * @param {!proto.itproject.registerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.registerResponse>}
 *     A native promise that resolves to the response
 */
proto.itproject.authenticatePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.authenticate/register',
      request,
      metadata || {},
      methodDescriptor_authenticate_register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.empty,
 *   !proto.itproject.empty>}
 */
const methodDescriptor_authenticate_registerFirebase = new grpc.web.MethodDescriptor(
  '/itproject.authenticate/registerFirebase',
  grpc.web.MethodType.UNARY,
  proto.itproject.empty,
  proto.itproject.empty,
  /**
   * @param {!proto.itproject.empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.empty,
 *   !proto.itproject.empty>}
 */
const methodInfo_authenticate_registerFirebase = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.empty,
  /**
   * @param {!proto.itproject.empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.empty.deserializeBinary
);


/**
 * @param {!proto.itproject.empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.authenticateClient.prototype.registerFirebase =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.authenticate/registerFirebase',
      request,
      metadata || {},
      methodDescriptor_authenticate_registerFirebase,
      callback);
};


/**
 * @param {!proto.itproject.empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.empty>}
 *     A native promise that resolves to the response
 */
proto.itproject.authenticatePromiseClient.prototype.registerFirebase =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.authenticate/registerFirebase',
      request,
      metadata || {},
      methodDescriptor_authenticate_registerFirebase);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.loginRequest,
 *   !proto.itproject.loginResponse>}
 */
const methodDescriptor_authenticate_login = new grpc.web.MethodDescriptor(
  '/itproject.authenticate/login',
  grpc.web.MethodType.UNARY,
  proto.itproject.loginRequest,
  proto.itproject.loginResponse,
  /**
   * @param {!proto.itproject.loginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.loginResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.loginRequest,
 *   !proto.itproject.loginResponse>}
 */
const methodInfo_authenticate_login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.loginResponse,
  /**
   * @param {!proto.itproject.loginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.loginResponse.deserializeBinary
);


/**
 * @param {!proto.itproject.loginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.loginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.loginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.authenticateClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.authenticate/login',
      request,
      metadata || {},
      methodDescriptor_authenticate_login,
      callback);
};


/**
 * @param {!proto.itproject.loginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.loginResponse>}
 *     A native promise that resolves to the response
 */
proto.itproject.authenticatePromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.authenticate/login',
      request,
      metadata || {},
      methodDescriptor_authenticate_login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.verifyRequest,
 *   !proto.itproject.verifyResponse>}
 */
const methodDescriptor_authenticate_verify = new grpc.web.MethodDescriptor(
  '/itproject.authenticate/verify',
  grpc.web.MethodType.UNARY,
  proto.itproject.verifyRequest,
  proto.itproject.verifyResponse,
  /**
   * @param {!proto.itproject.verifyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.verifyResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.verifyRequest,
 *   !proto.itproject.verifyResponse>}
 */
const methodInfo_authenticate_verify = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.verifyResponse,
  /**
   * @param {!proto.itproject.verifyRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.verifyResponse.deserializeBinary
);


/**
 * @param {!proto.itproject.verifyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.verifyResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.verifyResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.authenticateClient.prototype.verify =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.authenticate/verify',
      request,
      metadata || {},
      methodDescriptor_authenticate_verify,
      callback);
};


/**
 * @param {!proto.itproject.verifyRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.verifyResponse>}
 *     A native promise that resolves to the response
 */
proto.itproject.authenticatePromiseClient.prototype.verify =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.authenticate/verify',
      request,
      metadata || {},
      methodDescriptor_authenticate_verify);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.empty,
 *   !proto.itproject.getClaimsResponse>}
 */
const methodDescriptor_authenticate_getClaims = new grpc.web.MethodDescriptor(
  '/itproject.authenticate/getClaims',
  grpc.web.MethodType.UNARY,
  proto.itproject.empty,
  proto.itproject.getClaimsResponse,
  /**
   * @param {!proto.itproject.empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.getClaimsResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.empty,
 *   !proto.itproject.getClaimsResponse>}
 */
const methodInfo_authenticate_getClaims = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.getClaimsResponse,
  /**
   * @param {!proto.itproject.empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.getClaimsResponse.deserializeBinary
);


/**
 * @param {!proto.itproject.empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.getClaimsResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.getClaimsResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.authenticateClient.prototype.getClaims =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.authenticate/getClaims',
      request,
      metadata || {},
      methodDescriptor_authenticate_getClaims,
      callback);
};


/**
 * @param {!proto.itproject.empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.getClaimsResponse>}
 *     A native promise that resolves to the response
 */
proto.itproject.authenticatePromiseClient.prototype.getClaims =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.authenticate/getClaims',
      request,
      metadata || {},
      methodDescriptor_authenticate_getClaims);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.echoClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.echoPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.echoRequest,
 *   !proto.itproject.echoResponse>}
 */
const methodDescriptor_echo_echo = new grpc.web.MethodDescriptor(
  '/itproject.echo/echo',
  grpc.web.MethodType.UNARY,
  proto.itproject.echoRequest,
  proto.itproject.echoResponse,
  /**
   * @param {!proto.itproject.echoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.echoResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.echoRequest,
 *   !proto.itproject.echoResponse>}
 */
const methodInfo_echo_echo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.echoResponse,
  /**
   * @param {!proto.itproject.echoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.echoResponse.deserializeBinary
);


/**
 * @param {!proto.itproject.echoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.echoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.echoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.echoClient.prototype.echo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.echo/echo',
      request,
      metadata || {},
      methodDescriptor_echo_echo,
      callback);
};


/**
 * @param {!proto.itproject.echoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.echoResponse>}
 *     A native promise that resolves to the response
 */
proto.itproject.echoPromiseClient.prototype.echo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.echo/echo',
      request,
      metadata || {},
      methodDescriptor_echo_echo);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.profilesClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.profilesPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.getuserRequest,
 *   !proto.itproject.profile>}
 */
const methodDescriptor_profiles_getuser = new grpc.web.MethodDescriptor(
  '/itproject.profiles/getuser',
  grpc.web.MethodType.UNARY,
  proto.itproject.getuserRequest,
  proto.itproject.profile,
  /**
   * @param {!proto.itproject.getuserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.profile.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.getuserRequest,
 *   !proto.itproject.profile>}
 */
const methodInfo_profiles_getuser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.profile,
  /**
   * @param {!proto.itproject.getuserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.profile.deserializeBinary
);


/**
 * @param {!proto.itproject.getuserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.profile)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.profile>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.profilesClient.prototype.getuser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.profiles/getuser',
      request,
      metadata || {},
      methodDescriptor_profiles_getuser,
      callback);
};


/**
 * @param {!proto.itproject.getuserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.profile>}
 *     A native promise that resolves to the response
 */
proto.itproject.profilesPromiseClient.prototype.getuser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.profiles/getuser',
      request,
      metadata || {},
      methodDescriptor_profiles_getuser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.profile,
 *   !proto.itproject.empty>}
 */
const methodDescriptor_profiles_updateuser = new grpc.web.MethodDescriptor(
  '/itproject.profiles/updateuser',
  grpc.web.MethodType.UNARY,
  proto.itproject.profile,
  proto.itproject.empty,
  /**
   * @param {!proto.itproject.profile} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.profile,
 *   !proto.itproject.empty>}
 */
const methodInfo_profiles_updateuser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.empty,
  /**
   * @param {!proto.itproject.profile} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.empty.deserializeBinary
);


/**
 * @param {!proto.itproject.profile} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.profilesClient.prototype.updateuser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.profiles/updateuser',
      request,
      metadata || {},
      methodDescriptor_profiles_updateuser,
      callback);
};


/**
 * @param {!proto.itproject.profile} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.empty>}
 *     A native promise that resolves to the response
 */
proto.itproject.profilesPromiseClient.prototype.updateuser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.profiles/updateuser',
      request,
      metadata || {},
      methodDescriptor_profiles_updateuser);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.uploadClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.uploadPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.uploadRequest,
 *   !proto.itproject.uploadResponse>}
 */
const methodDescriptor_upload_upload = new grpc.web.MethodDescriptor(
  '/itproject.upload/upload',
  grpc.web.MethodType.UNARY,
  proto.itproject.uploadRequest,
  proto.itproject.uploadResponse,
  /**
   * @param {!proto.itproject.uploadRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.uploadResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.uploadRequest,
 *   !proto.itproject.uploadResponse>}
 */
const methodInfo_upload_upload = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.uploadResponse,
  /**
   * @param {!proto.itproject.uploadRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.uploadResponse.deserializeBinary
);


/**
 * @param {!proto.itproject.uploadRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.uploadResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.uploadResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.uploadClient.prototype.upload =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.upload/upload',
      request,
      metadata || {},
      methodDescriptor_upload_upload,
      callback);
};


/**
 * @param {!proto.itproject.uploadRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.uploadResponse>}
 *     A native promise that resolves to the response
 */
proto.itproject.uploadPromiseClient.prototype.upload =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.upload/upload',
      request,
      metadata || {},
      methodDescriptor_upload_upload);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.searchClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.itproject.searchPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.itproject.searchRequest,
 *   !proto.itproject.searchResponse>}
 */
const methodDescriptor_search_search = new grpc.web.MethodDescriptor(
  '/itproject.search/search',
  grpc.web.MethodType.UNARY,
  proto.itproject.searchRequest,
  proto.itproject.searchResponse,
  /**
   * @param {!proto.itproject.searchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.searchResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.itproject.searchRequest,
 *   !proto.itproject.searchResponse>}
 */
const methodInfo_search_search = new grpc.web.AbstractClientBase.MethodInfo(
  proto.itproject.searchResponse,
  /**
   * @param {!proto.itproject.searchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.itproject.searchResponse.deserializeBinary
);


/**
 * @param {!proto.itproject.searchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.itproject.searchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.itproject.searchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.itproject.searchClient.prototype.search =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/itproject.search/search',
      request,
      metadata || {},
      methodDescriptor_search_search,
      callback);
};


/**
 * @param {!proto.itproject.searchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.itproject.searchResponse>}
 *     A native promise that resolves to the response
 */
proto.itproject.searchPromiseClient.prototype.search =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/itproject.search/search',
      request,
      metadata || {},
      methodDescriptor_search_search);
};


module.exports = proto.itproject;

