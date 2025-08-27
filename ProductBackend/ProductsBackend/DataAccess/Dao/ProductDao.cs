using ProductsBackend.DataAcess.Dao;
using ProductsBackend.Models;

namespace ProductsBackend.DataAccess.Dao
{
    public class ProductDao : IProductDao
    {

        public readonly AppDbContext _context;

        public ProductDao(AppDbContext context)
        {
            _context = context;
        }

        public ProductModel Add(ProductModel product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();

            return product;
        }

        public void Delete(int id)
        {
            var product = _context.Products.Find(id);

            _context.Products.Remove(product);
            _context.SaveChanges();
        }

        public List<ProductModel> GetAllProducts()
        {
            return new List<ProductModel>(_context.Products);
        }

        public ProductModel GetProduct(int id)
        {
            return _context.Products.Find(id);
        }

        public void Update(ProductModel product)
        {
            var existingProduct = _context.Products.Find(product.Id);
            _context.Entry(existingProduct).CurrentValues.SetValues(product);
            _context.SaveChanges();
        }
    }
}
