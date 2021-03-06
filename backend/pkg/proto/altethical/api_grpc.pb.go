// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package altethical

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion7

// AltethicalClient is the client API for Altethical service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type AltethicalClient interface {
	// example is used to get which user is currently logged in
	Example(ctx context.Context, in *ExampleRequest, opts ...grpc.CallOption) (*ExampleResponse, error)
	SearchImage(ctx context.Context, in *SearchRequest, opts ...grpc.CallOption) (*SearchResponse, error)
	Byimages(ctx context.Context, in *ByimagesRequest, opts ...grpc.CallOption) (*SearchResponse, error)
	Byclicks(ctx context.Context, in *ByclicksRequest, opts ...grpc.CallOption) (*SearchResponse, error)
}

type altethicalClient struct {
	cc grpc.ClientConnInterface
}

func NewAltethicalClient(cc grpc.ClientConnInterface) AltethicalClient {
	return &altethicalClient{cc}
}

func (c *altethicalClient) Example(ctx context.Context, in *ExampleRequest, opts ...grpc.CallOption) (*ExampleResponse, error) {
	out := new(ExampleResponse)
	err := c.cc.Invoke(ctx, "/altethical.altethical/example", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *altethicalClient) SearchImage(ctx context.Context, in *SearchRequest, opts ...grpc.CallOption) (*SearchResponse, error) {
	out := new(SearchResponse)
	err := c.cc.Invoke(ctx, "/altethical.altethical/searchImage", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *altethicalClient) Byimages(ctx context.Context, in *ByimagesRequest, opts ...grpc.CallOption) (*SearchResponse, error) {
	out := new(SearchResponse)
	err := c.cc.Invoke(ctx, "/altethical.altethical/byimages", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *altethicalClient) Byclicks(ctx context.Context, in *ByclicksRequest, opts ...grpc.CallOption) (*SearchResponse, error) {
	out := new(SearchResponse)
	err := c.cc.Invoke(ctx, "/altethical.altethical/byclicks", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// AltethicalServer is the server API for Altethical service.
// All implementations must embed UnimplementedAltethicalServer
// for forward compatibility
type AltethicalServer interface {
	// example is used to get which user is currently logged in
	Example(context.Context, *ExampleRequest) (*ExampleResponse, error)
	SearchImage(context.Context, *SearchRequest) (*SearchResponse, error)
	Byimages(context.Context, *ByimagesRequest) (*SearchResponse, error)
	Byclicks(context.Context, *ByclicksRequest) (*SearchResponse, error)
	mustEmbedUnimplementedAltethicalServer()
}

// UnimplementedAltethicalServer must be embedded to have forward compatible implementations.
type UnimplementedAltethicalServer struct {
}

func (UnimplementedAltethicalServer) Example(context.Context, *ExampleRequest) (*ExampleResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Example not implemented")
}
func (UnimplementedAltethicalServer) SearchImage(context.Context, *SearchRequest) (*SearchResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SearchImage not implemented")
}
func (UnimplementedAltethicalServer) Byimages(context.Context, *ByimagesRequest) (*SearchResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Byimages not implemented")
}
func (UnimplementedAltethicalServer) Byclicks(context.Context, *ByclicksRequest) (*SearchResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Byclicks not implemented")
}
func (UnimplementedAltethicalServer) mustEmbedUnimplementedAltethicalServer() {}

// UnsafeAltethicalServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to AltethicalServer will
// result in compilation errors.
type UnsafeAltethicalServer interface {
	mustEmbedUnimplementedAltethicalServer()
}

func RegisterAltethicalServer(s grpc.ServiceRegistrar, srv AltethicalServer) {
	s.RegisterService(&_Altethical_serviceDesc, srv)
}

func _Altethical_Example_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ExampleRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AltethicalServer).Example(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/altethical.altethical/example",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AltethicalServer).Example(ctx, req.(*ExampleRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Altethical_SearchImage_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SearchRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AltethicalServer).SearchImage(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/altethical.altethical/searchImage",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AltethicalServer).SearchImage(ctx, req.(*SearchRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Altethical_Byimages_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ByimagesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AltethicalServer).Byimages(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/altethical.altethical/byimages",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AltethicalServer).Byimages(ctx, req.(*ByimagesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Altethical_Byclicks_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ByclicksRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(AltethicalServer).Byclicks(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/altethical.altethical/byclicks",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(AltethicalServer).Byclicks(ctx, req.(*ByclicksRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _Altethical_serviceDesc = grpc.ServiceDesc{
	ServiceName: "altethical.altethical",
	HandlerType: (*AltethicalServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "example",
			Handler:    _Altethical_Example_Handler,
		},
		{
			MethodName: "searchImage",
			Handler:    _Altethical_SearchImage_Handler,
		},
		{
			MethodName: "byimages",
			Handler:    _Altethical_Byimages_Handler,
		},
		{
			MethodName: "byclicks",
			Handler:    _Altethical_Byclicks_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "api.proto",
}
