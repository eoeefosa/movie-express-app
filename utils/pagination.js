exports.paginate = (page, limit) => {
    const offset = (page - 1) * limit;
    return {
      offset,
      limit,
      
    };
  };
  