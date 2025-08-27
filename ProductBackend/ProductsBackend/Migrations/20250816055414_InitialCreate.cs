using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ProductsBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "products",
                columns: new[] { "Id", "Description", "Name", "Price", "Type" },
                values: new object[,]
                {
                    { 1, "", "Café Especial", 19.90m, "" },
                    { 2, "", "Chá Verde Orgânico", 12.50m, "" },
                    { 3, "", "Chocolate 70% Cacau", 8.75m, "" },
                    { 4, "", "Biscoito Integral", 6.40m, "" },
                    { 5, "", "Suco de Laranja Natural", 9.90m, "" },
                    { 6, "", "Água Mineral com Gás", 3.50m, "" },
                    { 7, "", "Granola Premium", 15.20m, "" },
                    { 8, "", "Iogurte Grego", 7.80m, "" },
                    { 9, "", "Barra de Proteína", 10.00m, "" },
                    { 10, "", "Leite Vegetal de Amêndoas", 11.30m, "" },
                    { 11, "", "Molho de Tomate Artesanal", 5.90m, "" },
                    { 12, "", "Pão de Fermentação Natural", 13.50m, "" },
                    { 13, "", "Queijo Minas Frescal", 14.80m, "" },
                    { 14, "", "Azeite de Oliva Extra Virgem", 22.00m, "" },
                    { 15, "", "Mel Orgânico", 18.40m, "" },
                    { 16, "", "Farinha de Aveia", 6.90m, "" },
                    { 17, "", "Mix de Castanhas", 16.75m, "" },
                    { 18, "", "Vinagre de Maçã", 7.20m, "" },
                    { 19, "", "Sabonete Natural de Lavanda", 9.50m, "" },
                    { 20, "", "Shampoo Vegano", 17.60m, "" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "products");
        }
    }
}
