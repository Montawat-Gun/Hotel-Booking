namespace BL.Helpers
{
    public class LazyloadDto
    {
        public int? First { get; } = 0;
        public int? Rows { get; set; } = int.MaxValue;
        public string? SortField { get; set; } = "";
        public int? SortOrder { get; set; } = 1;
    }
}
