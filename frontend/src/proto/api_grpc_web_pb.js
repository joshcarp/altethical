/**
 * @fileoverview gRPC-Web generated client stub for altethical
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.altethical = require('./api_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.altethical.altethicalClient =
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
proto.altethical.altethicalPromiseClient =
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
 *   !proto.altethical.exampleRequest,
 *   !proto.altethical.exampleResponse>}
 */
const methodDescriptor_altethical_example = new grpc.web.MethodDescriptor(
  '/altethical.altethical/example',
  grpc.web.MethodType.UNARY,
  proto.altethical.exampleRequest,
  proto.altethical.exampleResponse,
  /**
   * @param {!proto.altethical.exampleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.exampleResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.altethical.exampleRequest,
 *   !proto.altethical.exampleResponse>}
 */
const methodInfo_altethical_example = new grpc.web.AbstractClientBase.MethodInfo(
  proto.altethical.exampleResponse,
  /**
   * @param {!proto.altethical.exampleRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.exampleResponse.deserializeBinary
);


/**
 * @param {!proto.altethical.exampleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.altethical.exampleResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.altethical.exampleResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.altethical.altethicalClient.prototype.example =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/altethical.altethical/example',
      request,
      metadata || {},
      methodDescriptor_altethical_example,
      callback);
};


/**
 * @param {!proto.altethical.exampleRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.altethical.exampleResponse>}
 *     A native promise that resolves to the response
 */
proto.altethical.altethicalPromiseClient.prototype.example =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/altethical.altethical/example',
      request,
      metadata || {},
      methodDescriptor_altethical_example);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.altethical.searchRequest,
 *   !proto.altethical.searchResponse>}
 */
const methodDescriptor_altethical_searchImage = new grpc.web.MethodDescriptor(
  '/altethical.altethical/searchImage',
  grpc.web.MethodType.UNARY,
  proto.altethical.searchRequest,
  proto.altethical.searchResponse,
  /**
   * @param {!proto.altethical.searchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.searchResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.altethical.searchRequest,
 *   !proto.altethical.searchResponse>}
 */
const methodInfo_altethical_searchImage = new grpc.web.AbstractClientBase.MethodInfo(
  proto.altethical.searchResponse,
  /**
   * @param {!proto.altethical.searchRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.searchResponse.deserializeBinary
);


/**
 * @param {!proto.altethical.searchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.altethical.searchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.altethical.searchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.altethical.altethicalClient.prototype.searchImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/altethical.altethical/searchImage',
      request,
      metadata || {},
      methodDescriptor_altethical_searchImage,
      callback);
};


/**
 * @param {!proto.altethical.searchRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.altethical.searchResponse>}
 *     A native promise that resolves to the response
 */
proto.altethical.altethicalPromiseClient.prototype.searchImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/altethical.altethical/searchImage',
      request,
      metadata || {},
      methodDescriptor_altethical_searchImage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.altethical.byimagesRequest,
 *   !proto.altethical.searchResponse>}
 */
const methodDescriptor_altethical_byimages = new grpc.web.MethodDescriptor(
  '/altethical.altethical/byimages',
  grpc.web.MethodType.UNARY,
  proto.altethical.byimagesRequest,
  proto.altethical.searchResponse,
  /**
   * @param {!proto.altethical.byimagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.searchResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.altethical.byimagesRequest,
 *   !proto.altethical.searchResponse>}
 */
const methodInfo_altethical_byimages = new grpc.web.AbstractClientBase.MethodInfo(
  proto.altethical.searchResponse,
  /**
   * @param {!proto.altethical.byimagesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.searchResponse.deserializeBinary
);


/**
 * @param {!proto.altethical.byimagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.altethical.searchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.altethical.searchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.altethical.altethicalClient.prototype.byimages =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/altethical.altethical/byimages',
      request,
      metadata || {},
      methodDescriptor_altethical_byimages,
      callback);
};


/**
 * @param {!proto.altethical.byimagesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.altethical.searchResponse>}
 *     A native promise that resolves to the response
 */
proto.altethical.altethicalPromiseClient.prototype.byimages =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/altethical.altethical/byimages',
      request,
      metadata || {},
      methodDescriptor_altethical_byimages);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.altethical.byclicksRequest,
 *   !proto.altethical.searchResponse>}
 */
const methodDescriptor_altethical_byclicks = new grpc.web.MethodDescriptor(
  '/altethical.altethical/byclicks',
  grpc.web.MethodType.UNARY,
  proto.altethical.byclicksRequest,
  proto.altethical.searchResponse,
  /**
   * @param {!proto.altethical.byclicksRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.searchResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.altethical.byclicksRequest,
 *   !proto.altethical.searchResponse>}
 */
const methodInfo_altethical_byclicks = new grpc.web.AbstractClientBase.MethodInfo(
  proto.altethical.searchResponse,
  /**
   * @param {!proto.altethical.byclicksRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.altethical.searchResponse.deserializeBinary
);


/**
 * @param {!proto.altethical.byclicksRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.altethical.searchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.altethical.searchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.altethical.altethicalClient.prototype.byclicks =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/altethical.altethical/byclicks',
      request,
      metadata || {},
      methodDescriptor_altethical_byclicks,
      callback);
};


/**
 * @param {!proto.altethical.byclicksRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.altethical.searchResponse>}
 *     A native promise that resolves to the response
 */
proto.altethical.altethicalPromiseClient.prototype.byclicks =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/altethical.altethical/byclicks',
      request,
      metadata || {},
      methodDescriptor_altethical_byclicks);
};


module.exports = proto.altethical;

