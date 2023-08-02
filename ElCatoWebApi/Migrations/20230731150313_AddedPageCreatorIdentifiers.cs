using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElCatoWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedPageCreatorIdentifiers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Accepted",
                table: "Pages",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Pages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FingerPrint",
                table: "Pages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IpAddress",
                table: "Pages",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accepted",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "FingerPrint",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "IpAddress",
                table: "Pages");
        }
    }
}
