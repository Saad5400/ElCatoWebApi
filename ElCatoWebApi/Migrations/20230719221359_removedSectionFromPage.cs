using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElCatoWebApi.Migrations
{
    /// <inheritdoc />
    public partial class removedSectionFromPage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pages_Sections_SectionId",
                table: "Pages");

            migrationBuilder.DropIndex(
                name: "IX_Pages_SectionId",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "Pages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SectionId",
                table: "Pages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Pages_SectionId",
                table: "Pages",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pages_Sections_SectionId",
                table: "Pages",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
