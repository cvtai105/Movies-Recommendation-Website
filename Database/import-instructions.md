# Import database

1. Change connection string:

-   In Source/ASP/Api/appsettings.Development.json, change connection string in section ConnectionStrings.PostgreSQLConnection
-   Java?

2. Run migrations <br>
   install dotnet if not and run:

```bash
dotnet tool install --global dotnet-ef
cd Source/ASP
dotnet ef database update --project Infrastructure --startup-project Api
```

3. The migration scripts is in the folder Source/ASP/Infrastructure/Data/PostgresMigrations
