namespace BL.Helpers.Attributes
{
    internal class QueryAttribute : Attribute
    {
        public string Name { get; set; }
        public Operation Operation { get; set; }

        public QueryAttribute(Operation operation)
        {
            Operation = operation;
        }

        public QueryAttribute(string name, Operation operation)
        {
            Name = name;
            Operation = operation;
        }
    }
}
