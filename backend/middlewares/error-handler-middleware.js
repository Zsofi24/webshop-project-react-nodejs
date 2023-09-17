export default function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500);
  
    if (process.env.NODE_ENV !== 'production')
      return res.json({ error: {status: err.status || 500, message: err.message}});
    return res.json({ error: {status: err.status || 500, message: err.message}});
}