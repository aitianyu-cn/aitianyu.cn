#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["back.aitianyu.cn/back.aitianyu.cn.csproj", "back.aitianyu.cn/"]
RUN dotnet restore "back.aitianyu.cn/back.aitianyu.cn.csproj"
COPY . .
WORKDIR "/src/back.aitianyu.cn"
RUN dotnet build "back.aitianyu.cn.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "back.aitianyu.cn.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "back.aitianyu.cn.dll"]