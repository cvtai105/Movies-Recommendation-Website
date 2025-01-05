# How to run app:
### For Demo, Run with docker

### For developer:
_NodeJs, .Net8, Java is required_

1. User Interface App (Vite/ReactJs) <br>

``` bash
cd UI           # change directory to UI folder
npm i           # install dependencies
npm run dev     # run app in develop environment
```
App Url: http://localhost:5173 

2. Identity Service, ... (ASP.NET) <br>
``` bash
cd ASP                      # change directory  
dotnet restore              # restore dependencies
dotnet run --project Api    # run app
```
Swagger Url: http://localhost:5199

3. SpringBoot
