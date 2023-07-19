using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElCatoWebApi.Migrations
{
    /// <inheritdoc />
    public partial class ModefiedPages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TitleIcon",
                table: "Pages",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ViewCount",
                table: "Pages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TitleIcon",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "ViewCount",
                table: "Pages");
        }
    }
}
