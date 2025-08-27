using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductsBackend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveFieldsDescAndType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "products");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "products");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 16,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 17,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 18,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 19,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });

            migrationBuilder.UpdateData(
                table: "products",
                keyColumn: "Id",
                keyValue: 20,
                columns: new[] { "Description", "Type" },
                values: new object[] { "", "" });
        }
    }
}
