namespace BL.Helpers
{
    public class LazyloadDto
    {
        public int First { get; }
        public int Rows { get; set; }
        public string? SortField { get; set; }
        public int? SortOrder { get; set; }
    }
}
