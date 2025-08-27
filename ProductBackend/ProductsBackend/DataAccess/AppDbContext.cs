using Microsoft.EntityFrameworkCore;
using ProductsBackend.Models;

namespace ProductsBackend.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ProductModel> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductModel>(entity =>
            {
                entity.ToTable("products");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            });

            modelBuilder.Entity<ProductModel>().HasData(
                new ProductModel { Id = 1, Name = "Café Especial", Price = 19.90m },
                new ProductModel { Id = 2, Name = "Chá Verde Orgânico", Price = 12.50m },
                new ProductModel { Id = 3, Name = "Chocolate 70% Cacau", Price = 8.75m },
                new ProductModel { Id = 4, Name = "Biscoito Integral", Price = 6.40m },
                new ProductModel { Id = 5, Name = "Suco de Laranja Natural", Price = 9.90m },
                new ProductModel { Id = 6, Name = "Água Mineral com Gás", Price = 3.50m },
                new ProductModel { Id = 7, Name = "Granola Premium", Price = 15.20m },
                new ProductModel { Id = 8, Name = "Iogurte Grego", Price = 7.80m },
                new ProductModel { Id = 9, Name = "Barra de Proteína", Price = 10.00m },
                new ProductModel { Id = 10, Name = "Leite Vegetal de Amêndoas", Price = 11.30m },
                new ProductModel { Id = 11, Name = "Molho de Tomate Artesanal", Price = 5.90m },
                new ProductModel { Id = 12, Name = "Pão de Fermentação Natural", Price = 13.50m },
                new ProductModel { Id = 13, Name = "Queijo Minas Frescal", Price = 14.80m },
                new ProductModel { Id = 14, Name = "Azeite de Oliva Extra Virgem", Price = 22.00m },
                new ProductModel { Id = 15, Name = "Mel Orgânico", Price = 18.40m },
                new ProductModel { Id = 16, Name = "Farinha de Aveia", Price = 6.90m },
                new ProductModel { Id = 17, Name = "Mix de Castanhas", Price = 16.75m },
                new ProductModel { Id = 18, Name = "Vinagre de Maçã", Price = 7.20m },
                new ProductModel { Id = 19, Name = "Sabonete Natural de Lavanda", Price = 9.50m },
                new ProductModel { Id = 20, Name = "Shampoo Vegano", Price = 17.60m }
            );

        }
    }
}
