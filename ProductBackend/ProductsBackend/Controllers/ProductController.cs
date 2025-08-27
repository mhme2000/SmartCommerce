using Microsoft.AspNetCore.Mvc;
using ProductsBackend.DataAcess.Dao;
using ProductsBackend.Models;
using System.Text;

namespace ProductsBackend.Controllers
{
    [ApiController]
    [Route("api/product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductDao _productsDao;

        public ProductController(IProductDao productsDao)
        {
            _productsDao = productsDao;
        }

        
        [HttpGet]
        public ActionResult<IEnumerable<ProductModel>> GetProducts()
        {
            List<ProductModel> listProducts = _productsDao.GetAllProducts();

            if (listProducts == null || !listProducts.Any())
            {
                return NotFound("Products not found.");
            }

            return Ok(listProducts.OrderByDescending(x => x.Id));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var product = _productsDao.GetProduct(id);

            if(product == null)
            {
                return NotFound($"product with id {id} not found.");
            }

            _productsDao.Delete(id);

            return Ok();
        }

        [HttpPost]
        public ActionResult<ProductModel> AddProduct([FromBody] ProductModel product)
        {
            if(product == null)
            {
                return BadRequest("invalid body.");
            }

            var created = _productsDao.Add(product);

            return Ok(created);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateProduct(int id, [FromBody] ProductModel product)
        {
            if(product == null || product.Id != id)
            {
                return BadRequest("invalid body.");
            }

            var existing = _productsDao.GetProduct(id);

            if(existing == null)
            {
                return NotFound($"product with id {id} not found.");
            }

            _productsDao.Update(product);

            return Ok();
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadProduct(IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest("Empty file.");
            }

            var products = new List<ProductModel>();

            using(var stream = new StreamReader(file.OpenReadStream()))
            {
                bool firstLine = true;

                string line;

                while ((line = await stream.ReadLineAsync()) != null)
                {
                    if (firstLine)
                    {
                        firstLine = false;
                        continue;
                    }

                    var values = line.Split(';');

                    _productsDao.Add(new ProductModel
                    {
                        Name = values[0].Trim(),
                        Price = decimal.TryParse(values[1], out var _price) ? _price : 0,
                    });
                }
            }

            return Ok();
        }

        [HttpGet("download-layout")]
        public IActionResult DownloadCsvLayout()
        {
            var csvBuilder = new StringBuilder();

            csvBuilder.AppendLine("Nome do produto;Preco");
            csvBuilder.AppendLine("Produto 1;1.00");
            csvBuilder.AppendLine("Produto 2;2.00");

            byte[] csvBytes = Encoding.UTF8.GetBytes(csvBuilder.ToString());

            return File(csvBytes, "text/csv", "layout.csv");
        }
    }
}
