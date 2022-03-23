using BL.Helpers.Attributes;
using System.Linq.Expressions;
using System.Reflection;

namespace BL.Helpers
{
    internal class QueryManager<TEntity, TQueryDto>
    {
        public IQueryable<TEntity> GetQuery(IQueryable<TEntity> source, TQueryDto queryDto)
        {
            var param = Expression.Parameter(typeof(TEntity), typeof(TEntity).Name);
            var properties = queryDto!.GetType().GetProperties().Where(x => x.GetValue(queryDto) is not null);
            List<Expression> predicates = new List<Expression>();

            foreach (var property in properties)
            {
                var attribute = property.GetCustomAttributes(typeof(QueryAttribute), false).Cast<QueryAttribute>().FirstOrDefault();
                var operation = attribute!.Operation;
                var valueExp = Expression.Constant(property.GetValue(queryDto), property.GetValue(queryDto)!.GetType());
                var propertyExp = Expression.Property(param, property.Name);
                MethodInfo method;
                Expression expr;
                switch (operation)
                {
                    case Operation.Equal:
                        expr = Expression.Equal(propertyExp, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.LessThan:
                        expr = Expression.LessThan(propertyExp, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.LessThanOrEqual:
                        expr = Expression.LessThanOrEqual(propertyExp, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.GreaterThan:
                        expr = Expression.GreaterThan(propertyExp, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.GreaterThanOrEqual:
                        expr = Expression.GreaterThanOrEqual(propertyExp, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.NotEqual:
                        expr = Expression.NotEqual(propertyExp, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.StartsWith:
                        method = typeof(string).GetMethod("StartsWith", new[] { typeof(string) })!;
                        expr = Expression.Call(propertyExp, method, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.EndsWith:
                        method = typeof(string).GetMethod("EndsWith", new[] { typeof(string) })!;
                        expr = Expression.Call(propertyExp, method, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.Contains:
                        method = typeof(string).GetMethod("Contains", new[] { typeof(string) })!;
                        expr = Expression.Call(propertyExp, method, valueExp);
                        predicates.Add(expr);
                        break;
                    case Operation.NotContains:
                        method = typeof(string).GetMethod("Contains", new[] { typeof(string) })!;
                        expr = Expression.Call(propertyExp, method, valueExp);
                        predicates.Add(Expression.Not(expr));
                        break;
                }
            }

            var queryableType = typeof(Queryable);
            var whereMethod = queryableType.GetMethods()
                   .First(m =>
                   {
                       var parameters = m.GetParameters().ToList();
                       return m.Name == "Where" && m.IsGenericMethodDefinition &&
                       parameters.Count == 2;
                   });

            Expression expression;
            if (!predicates.Any())
            {
                return source;
            }
            else if (predicates.Count > 1)
            {
                expression = predicates.Aggregate(
                    (prev, current) => Expression.And(prev, current)
                );
            }
            else
            {
                expression = predicates.First();
            }

            var whereClause = Expression.Lambda<Func<TEntity, bool>>(expression!,
                              new ParameterExpression[] { param });

            var genericMethod = whereMethod.MakeGenericMethod(typeof(TEntity));
            var newQuery = (IQueryable<TEntity>)genericMethod.Invoke(genericMethod, new object[] { source, whereClause })!;
            return newQuery;
        }
    }
}
