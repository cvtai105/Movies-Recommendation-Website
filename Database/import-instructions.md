# Import database
1. In Source/ASP/Api/appsettings.Development.json, change connection string in section ConnectionStrings.PostgreSQLConnection
2. Run migrations:
```bash
cd Source/ASP
dotnet ef database update --project Infrastructure --startup-project Api
```

3. The migration scripts is in the folder Source/ASP/Infrastructure/Data/PostgresMigrations