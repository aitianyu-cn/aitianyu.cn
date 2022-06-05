using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.MapFallbackToFile("index.html");
}
else
{
    app.MapFallback(() => "Unknown Map");
}

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "resources/")),
    RequestPath = new PathString("/resources"),
    EnableDirectoryBrowsing = false
});
app.UseStaticFiles();
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

back.aitianyu.cn.Utils.Initial.InitDatabase();

app.Run();
