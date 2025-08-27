using ProductsBackend.Models;

namespace ProductsBackend.DataAcess.Dao
{
    public interface IProductDao
    {
        void Delete(int id);
        List<ProductModel> GetAllProducts();
        ProductModel GetProduct(int id);
        ProductModel Add(ProductModel product);
        void Update(ProductModel product);
    }
}
