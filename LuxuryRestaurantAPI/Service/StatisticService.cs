using LuxuryRestaurantAPI.Models;
using LuxuryRestaurantAPI.DTO;
using MongoDB.Driver;

namespace LuxuryRestaurantAPI.Service;

public class StatisticService
{
    private readonly IMongoCollection<Order> _orderCollection;
    public StatisticService(IConfiguration configuration)
    {
        string CNS = configuration.GetConnectionString("DefaultConnection");

        MongoClient mongoClient = new MongoClient(CNS);

        IMongoDatabase mongoDatabase = mongoClient.GetDatabase("luxury-restaurant");

        _orderCollection = mongoDatabase.GetCollection<Order>("orders");
    }

    public async Task<Dictionary<DayOfWeek, double>> GetSalesPerDayOfWeek()
    {
        List<Order> order = await _orderCollection.Find(_ => true).ToListAsync();
        Dictionary<DayOfWeek, double> sales = new Dictionary<DayOfWeek, double>();
        for (int i = 0; i < 7; i++)
        {
            IEnumerable<Order> orderDOW = order.Where(c => c.OrderDate.DayOfWeek == (DayOfWeek)i);//0 : Sunday
            if (orderDOW.Count() == 0)
                sales.Add((DayOfWeek)i, 0);
            else
                sales.Add((DayOfWeek)i, orderDOW.Sum(c => c.OrderTotal));
        }
        return sales;
    }

    public async Task<IEnumerable<TopSeller>> GetTopSeller()
    {
        List<Order> order = await _orderCollection.Find(_ => true).ToListAsync();
        IEnumerable<OrderDetail> orderDetail = order.SelectMany(c => c.OrderDetails);

        return orderDetail.GroupBy(c => c.FoodName)
        .Select(c => new TopSeller
        {
            Name = c.First().FoodName,
            Count = c.Sum(x => x.Quantity)
        }).OrderByDescending(c => c.Count).Take(5);
    }
}
