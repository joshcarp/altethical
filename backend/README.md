# Backend

cmd/
    - All of the executables
pkg/
    - internal common packages that are used in internal and cmd
internal/
    - All of the servers that are run in the executables (1:1 mapping to cmd, almost)
pkg/proto/
    - automatically generated code from protobufs