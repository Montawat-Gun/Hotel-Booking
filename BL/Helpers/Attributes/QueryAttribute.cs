namespace BL.Helpers.Attributes
{
    internal class QueryAttribute : Attribute
    {
        public Operation Operation { get; set; }
        public QueryAttribute(Operation operation)
        {
            Operation = operation;
        }
    }
}
