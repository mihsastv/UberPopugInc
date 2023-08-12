# Protocol Documentation
<a name="top"></a>

## Table of Contents

- [rsdk/examples/v1/object.proto](#rsdk_examples_v1_object-proto)
    - [Object](#rsdk-examples-v1-Object)
  
- [rsdk/examples/v1/stored_object.proto](#rsdk_examples_v1_stored_object-proto)
    - [StoredObject](#rsdk-examples-v1-StoredObject)
  
- [rsdk/examples/v1/object_storage_client.proto](#rsdk_examples_v1_object_storage_client-proto)
    - [AddObjectRequest](#rsdk-examples-v1-AddObjectRequest)
    - [AddObjectResponse](#rsdk-examples-v1-AddObjectResponse)
    - [AddObjectStreamRequest](#rsdk-examples-v1-AddObjectStreamRequest)
    - [AddObjectStreamResponse](#rsdk-examples-v1-AddObjectStreamResponse)
    - [GetObjectRequest](#rsdk-examples-v1-GetObjectRequest)
    - [GetObjectResponse](#rsdk-examples-v1-GetObjectResponse)
    - [GetObjectStreamRequest](#rsdk-examples-v1-GetObjectStreamRequest)
    - [GetObjectStreamResponse](#rsdk-examples-v1-GetObjectStreamResponse)
    - [RemoveObjectRequest](#rsdk-examples-v1-RemoveObjectRequest)
    - [RemoveObjectResponse](#rsdk-examples-v1-RemoveObjectResponse)
  
    - [ObjectStorageClientService](#rsdk-examples-v1-ObjectStorageClientService)
  
- [Scalar Value Types](#scalar-value-types)



<a name="rsdk_examples_v1_object-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## rsdk/examples/v1/object.proto
Object


<a name="rsdk-examples-v1-Object"></a>

### Object
Object


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| filename | [string](#string) |  | filename to be reported as the name of the file. Use of unicode is allowed. |
| content | [bytes](#bytes) |  | content |
| content_type | [string](#string) | optional | content_type for the object. |





 

 

 

 



<a name="rsdk_examples_v1_stored_object-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## rsdk/examples/v1/stored_object.proto
StoredObject


<a name="rsdk-examples-v1-StoredObject"></a>

### StoredObject
StoredObject


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  | uuid |
| filename | [string](#string) |  | filename |
| size | [uint32](#uint32) |  | file size |





 

 

 

 



<a name="rsdk_examples_v1_object_storage_client-proto"></a>
<p align="right"><a href="#top">Top</a></p>

## rsdk/examples/v1/object_storage_client.proto
ObjectStorageClient


<a name="rsdk-examples-v1-AddObjectRequest"></a>

### AddObjectRequest
AddObjectRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| object | [Object](#rsdk-examples-v1-Object) |  | object |






<a name="rsdk-examples-v1-AddObjectResponse"></a>

### AddObjectResponse
AddObjectResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| stored_object | [StoredObject](#rsdk-examples-v1-StoredObject) |  | object |






<a name="rsdk-examples-v1-AddObjectStreamRequest"></a>

### AddObjectStreamRequest
AddObjectStreamRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| object | [Object](#rsdk-examples-v1-Object) |  | object |






<a name="rsdk-examples-v1-AddObjectStreamResponse"></a>

### AddObjectStreamResponse
AddObjectStreamResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| stored_object | [StoredObject](#rsdk-examples-v1-StoredObject) |  | object |






<a name="rsdk-examples-v1-GetObjectRequest"></a>

### GetObjectRequest
GetObjectRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  | key is object key |






<a name="rsdk-examples-v1-GetObjectResponse"></a>

### GetObjectResponse
GetObjectResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  | key |
| object | [Object](#rsdk-examples-v1-Object) |  | object |






<a name="rsdk-examples-v1-GetObjectStreamRequest"></a>

### GetObjectStreamRequest
GetObjectStreamRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  | key is object key |






<a name="rsdk-examples-v1-GetObjectStreamResponse"></a>

### GetObjectStreamResponse
GetObjectStreamResponse


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  | key |
| object | [Object](#rsdk-examples-v1-Object) |  | object |






<a name="rsdk-examples-v1-RemoveObjectRequest"></a>

### RemoveObjectRequest
RemoveObjectRequest


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| key | [string](#string) |  | key is object key |






<a name="rsdk-examples-v1-RemoveObjectResponse"></a>

### RemoveObjectResponse
RemoveObjectResponse





 

 

 


<a name="rsdk-examples-v1-ObjectStorageClientService"></a>

### ObjectStorageClientService
ObjectStorageClientService

| Method Name | Request Type | Response Type | Description |
| ----------- | ------------ | ------------- | ------------|
| GetObject | [GetObjectRequest](#rsdk-examples-v1-GetObjectRequest) | [GetObjectResponse](#rsdk-examples-v1-GetObjectResponse) | GetObject returns an object by key |
| GetObjectStream | [GetObjectStreamRequest](#rsdk-examples-v1-GetObjectStreamRequest) | [GetObjectStreamResponse](#rsdk-examples-v1-GetObjectStreamResponse) stream | GetObjectStream returns an object by key as a stream |
| AddObject | [AddObjectRequest](#rsdk-examples-v1-AddObjectRequest) | [AddObjectResponse](#rsdk-examples-v1-AddObjectResponse) | AddObject creates an object |
| AddObjectStream | [AddObjectStreamRequest](#rsdk-examples-v1-AddObjectStreamRequest) stream | [AddObjectStreamResponse](#rsdk-examples-v1-AddObjectStreamResponse) | AddObjectStream creates an object from stream |
| RemoveObject | [RemoveObjectRequest](#rsdk-examples-v1-RemoveObjectRequest) | [RemoveObjectResponse](#rsdk-examples-v1-RemoveObjectResponse) | RemoveObject removes an object by key |

 



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

