var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseFileServer("/temp");
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "project_docs",
    pattern: "project_docs/{controller}/{action=Name}/{projectName?}/{nameSpace?}/{dataType?}");

app.MapControllerRoute(
    name: "global",
    pattern: "[controller]");

app.MapFallback(() => "Unkown Map");
//app.MapFallbackToFile("index.html");
//app.MapGet("/", () => "Hello World!");

app.Run();
