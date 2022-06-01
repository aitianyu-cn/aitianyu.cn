using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "resources/")),
    RequestPath = new PathString("/resources"),
    EnableDirectoryBrowsing = false
});
//app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "project_docs",
    pattern: "project_docs/[controller]/{projectName?}/{nameSpace?}/{dataType?}");

app.MapControllerRoute(
    name: "project_download",
    pattern: "project_download/[controller]/{operationData?}");

app.MapControllerRoute(
    name: "global",
    pattern: "global/[controller]");

app.MapFallback(() => "Unkown Map");
//app.MapFallbackToFile("index.html");
//app.MapGet("/", () => "Hello World!");

back.aitianyu.cn.Utils.Initial.InitDatabase();

app.Run();