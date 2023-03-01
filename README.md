
# NESTJS SWAGGER CONFIG
related: nestjs, @nestjs/swagger

`nestjs-swagger-config` for nestjs swagger allows you to develop your swagger docs still mantaining clean controllers. Define your all method docs configs with a single decorator.

##  Install
required: @nestjs/common. @nestjs/core, @nestjs/swagger

```bash
$ npm install nestjs-swagger-config
```


## Usage
Use the apropriated decorator to config your method. In order to make your doc configs cleaner, is recommended to create auxiliar objects to set your decorators, as you can see in the example bellow:

```ts
  // User Controller
  
  @MethodDocConfig(listUserDocConfig)
  @Get()
  async list() {
    return this.userService.list();
  }
```

```ts
  // Swagger config objects folder
  import { UserModel } from 'src/swagger-config/models/response-models/swagger-user.model';
import { ObjGenModes, statusConfigPatternsDict } from 'nestjs-swagger-config';

export const listUserDocConfig = {
  responses: {
    basicDefaults: {
      config: statusConfigPatternsDict.standardGet,
      mode: ObjGenModes.RemoveValues,
      statusCodes: [200, 401, 403],
    },
    detailedDefaults: [
      {
        status: 200,
        description: 'Ok',
        model: UserModel,
        modelConfig: 'array',
      },
      {
        status: 400,
        description: 'Bad Request',
      },
      {
        status: 401,
      },
    ],
  },
};
```


## Decorators

### OperationsDefaultResponses
Creates a collection of simple/basic preseted swagger ApiResponses() based in a set of status codes, including just basic rsponses configs - the http status code and its default descriptions. 

```ts
OperationsDefaultResponses (
  config: string,
  mode?: ObjGenModes,
  ...statusCodes: number[]
)
```

  - config : a string containing an intial config, from onestatusConfigPatternsDict(can be imported) options:
  
  ```ts
  export const statusConfigPatternsDict = {
    standardGet: '200 400 401 403 404 408 500',
    standardGetById: '200 400 401 404 403 408 500',
    standardPost: '201 400 401 403 404 408 500',
    standardPut: '201 400 401 403 404 408 500',
    standardPatch: '201 400 401 403 404 408 500',
    standardDelete: '204 400 401 403 404 408 500',
    fromZero: ' ',
  };
  ```
  
  - mode : Choose form Add or Remove status codes to/from previous provided config. Import ObjGenModes enum to set it:
  
  ```ts
  export enum ObjGenModes {
  AddValues,
  RemoveValues,
  }
  ```
  
  - statusCodes: numbers of status codes you want to add/ remove.


  You could set OperationsDefaultResponses() decorator like this:
  
  ```ts
  @OperationsDefaultResponses(statusConfigPatternsDict.standardDelete)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.userService.destroy(id);
  }
  ```
  
  That would create the following responses set in your swagger ui:
  
  ![image](https://user-images.githubusercontent.com/38916533/221721489-2eb8e920-1f1b-48cb-b05f-b6ec9d161081.png)


### DetailedDefaultResponses
Creates a collection of detailed ApiResponses() including custom response templates and description - based on a set of DetailedDefaultsObjects and eventually a BasicDefaultsObject - one that works similarly to OperationsDefaultResponses - as well. If there is a BasicDefaultsObject, all status/default settings indicated by it are handled first, and then DetailedDefaultsObjects are overridden if there are any overlaps. In any case of double status, the more detailed object overrides the less detailed one.

OBS: 

```ts
DetailedDefaultResponses = (
  basicOrDetailedDefaults?: BasicDefaultsObject | DetailedDefaultsObject,
  ...detailedDefaults: DetailedDefaultsObject[]
)
```

```ts
export type BasicDefaultsObject = {
  config: string;
  mode?: ObjGenModes;
  statusCodes?: number[];
};
```

```ts
export type DetailedDefaultsObject = {
  status: number;
  description?: string;
  model?: any;
  modelType?: string;
  modelConfig?: string;
};



 You could set DetailedDefaultResponses() decorator like this:


```

```ts
@DetailedDefaultResponses(...listUserDetailedDefaultsArray)
  @Get()
  async list() {
    return this.userService.list();
  }
```

```ts
export const listUserDetailedDefaultsArray = [
  {
    config: statusConfigPatternsDict.standardGet,
    mode: ObjGenModes.RemoveValues,
    statusCodes: [200, 401, 403],
  },
  {
    status: 200,
    description: 'Ok',
    model: UserModel,
    modelConfig: 'array',
  },
  {
    status: 400,
    description: 'Bad Request',
  },
  {
    status: 401,
  },
];
```

That would create the following responses set in your swagger ui:

![image](https://user-images.githubusercontent.com/38916533/221826031-d24ffc64-011b-4890-8156-e35b311714dc.png)

### MethodDocConfig
Combines DetailedDefaultsResponses calls with @nestjs/swagger Api Decorators (ApiOperation, ApiBody, ApiParam, ApiQuery currently supported) to create a single documentation decorator call. It accept the following object as arg (note that swagger api decorators options objects are actually all defined in @nestjs/swagger):

```ts
export type MethodDocConfigObject = {
  responses?: ResponsesConfigObject;
  apiOperation?: ApiOperationOptions;
  apiBody?: ApiBodyOptions;
  apiParam?: ApiParamOptions;
  apiQuery?: ApiQueryOptions;
};
```
```ts
export type ResponsesConfigObject = {
  basicDefaults?: BasicDefaultsObject;
  detailedDefaults?: DetailedDefaultsObject[];
  apiResponse?: ApiResponseOptions[];
};
```

You could set MethodDocConfig() decorator like this:

```ts
  @MethodDocConfig(showUserDocConfig)
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }
```
```ts
export const showUserDocConfig = {
  apiParam: ShowUserApiParamConfigObject,
  responses: {
    basicDefaults: { config: statusConfigPatternsDict.standardGetById },
  },
};

export const ShowUserApiParamConfigObject: ApiParamOptions = {
  name: 'id',
  description: 'Send the target user id as a path param ',
};
```
That would create the following responses set in your swagger ui:
![image](https://user-images.githubusercontent.com/38916533/221830268-055046e9-b87f-43e6-840d-72c2a31add70.png)
![image](https://user-images.githubusercontent.com/38916533/221830349-493f4e3a-166d-4bef-b27d-8b3758f8ee13.png)





