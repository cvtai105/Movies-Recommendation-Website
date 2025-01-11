# How to run app:
### For Demo, Run with docker
1. Run - this will automatically create databas
```bash
docker compose -f docker-compose.dev.yml up -d
```
2. Remove containers and volumes
```bash
docker compose -f docker-compose.dev.yml down -v
```


### For developer, Run with compiler
_NodeJs, .Net8, Java, MSSQL/Postgres is required_

<!-- 0. Migrate Database
```bash
dotnet tool install --global dotnet-ef
cd ASP
dotnet ef database update --project Infrastructure --startup-project Api
``` -->
0. Postgres database properties:
- PGHOST=ep-blue-night-a1hhgj7z-pooler.ap-southeast-1.aws.neon.tech
- PGHOST_UNPOOLED=ep-blue-night-a1hhgj7z.ap-southeast-1.aws.neon.tech
- PGUSER=neondb_owner
- PGDATABASE=neondb
- PGPASSWORD=gQXOlYk5xnH4

1. Run User Interface App (Vite/ReactJs) <br>
``` bash
cd UI           # change directory to UI folder
npm i           # install dependencies
npm run dev     # run app in develop environment
```
UI Url: http://localhost:5173 


2. Run ASP.NET API <br>
``` bash
cd ASP                      # change directory  
dotnet restore              # restore dependencies
dotnet run --project Api    # run app
``` 
Swagger Url: http://localhost:5199


3. SpringBoot

    *Require maven build tool
```bash
cd Java                     
mvn clean                       #clean the project
mvn install                     #install and build target files
docker build -t javaaap .       #build docker image
docker run -t 8080:8080 javaap  #run docker
```
