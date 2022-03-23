namespace BL.Helpers
{
    public class LazyLoadResult<TResult>
    {
        public int Count { get; set; }
        public TResult Data { get; set; }

        public LazyLoadResult(int Count, TResult Data)
        {
            this.Count = Count;
            this.Data = Data;
        }
    }
}
