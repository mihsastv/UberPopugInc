# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [grpc/health/v1/health.proto](#grpc_health_v1_health-proto)
    - [HealthCheckRequest](#grpc-health-v1-HealthCheckRequest)
    - [HealthCheckResponse](#grpc-health-v1-HealthCheckResponse)
  
    - [HealthCheckResponse.ServingStatus](#grpc-health-v1-HealthCheckResponse-ServingStatus)
  
    - [Health](#grpc-health-v1-Health)
  
- [grpc/metrics/v1/metrics.proto](#grpc_metrics_v1_metrics-proto)
    - [GetRequest](#grpc-metrics-v1-GetRequest)
    - [GetResponse](#grpc-metrics-v1-GetResponse)
  
    - [Metrics](#grpc-metrics-v1-Metrics)
  
- [Scalar Value Types](#scalar-value-types)



<a name="grpc_health_v1_health-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## grpc/health/v1/health.proto



<a name="grpc-health-v1-HealthCheckRequest"></a>

### HealthCheckRequest
HealthCheckRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| service | [string](#string) |  | service |






<a name="grpc-health-v1-HealthCheckResponse"></a>

### HealthCheckResponse
HealthCheckResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| status | [HealthCheckResponse.ServingStatus](#grpc-health-v1-HealthCheckResponse-ServingStatus) |  | status |





 


<a name="grpc-health-v1-HealthCheckResponse-ServingStatus"></a>

### HealthCheckResponse.ServingStatus
ServingStatus

| Name | Number | Description |
| ---- | ------ | ----------- |
| UNKNOWN | 0 | buf:lint:ignore ENUM_ZERO_VALUE_SUFFIX buf:lint:ignore ENUM_VALUE_PREFIX UNKNOWN |
| SERVING | 1 | buf:lint:ignore ENUM_VALUE_PREFIX SERVING |
| NOT_SERVING | 2 | buf:lint:ignore ENUM_VALUE_PREFIX NOT_SERVING |
| SERVICE_UNKNOWN | 3 | buf:lint:ignore ENUM_VALUE_PREFIX SERVICE_UNKNOWN — Used only by the Watch method. |


 

 


<a name="grpc-health-v1-Health"></a>

### Health
buf:lint:ignore SERVICE_SUFFIX
Health

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Check | [HealthCheckRequest](#grpc-health-v1-HealthCheckRequest) | [HealthCheckResponse](#grpc-health-v1-HealthCheckResponse) | buf:lint:ignore RPC_REQUEST_RESPONSE_UNIQUE buf:lint:ignore RPC_REQUEST_STANDARD_NAME buf:lint:ignore RPC_RESPONSE_STANDARD_NAME Check |
| Watch | [HealthCheckRequest](#grpc-health-v1-HealthCheckRequest) | [HealthCheckResponse](#grpc-health-v1-HealthCheckResponse) stream | buf:lint:ignore RPC_REQUEST_RESPONSE_UNIQUE buf:lint:ignore RPC_REQUEST_STANDARD_NAME buf:lint:ignore RPC_RESPONSE_STANDARD_NAME Watch |

 



<a name="grpc_metrics_v1_metrics-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## grpc/metrics/v1/metrics.proto
metrics


<a name="grpc-metrics-v1-GetRequest"></a>

### GetRequest
Empty request






<a name="grpc-metrics-v1-GetResponse"></a>

### GetResponse
Metrics response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| metrics | [string](#string) |  | String in prometheus format |





 

 

 


<a name="grpc-metrics-v1-Metrics"></a>

### Metrics
buf:lint:ignore SERVICE_SUFFIX
MetricsService

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| Get | [GetRequest](#grpc-metrics-v1-GetRequest) | [GetResponse](#grpc-metrics-v1-GetResponse) | Get metrics in prometheus format |

 



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

