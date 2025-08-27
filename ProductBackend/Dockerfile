FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ProductsBackend.sln ./
COPY ./ProductsBackend/*.csproj ./ProductBackend/

RUN dotnet restore ./ProductBackend/ProductsBackend.csproj

COPY ProductsBackend/. ./ProductBackend/

RUN dotnet publish ProductBackend/ProductsBackend.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app ./

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


EXPOSE 5150

ENTRYPOINT ["/wait-for-it.sh", "db:5432", "--", "dotnet", "ProductsBackend.dll"]