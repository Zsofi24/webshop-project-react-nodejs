export default function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500);
  
    if (process.env.NODE_ENV !== 'production')
      return res.send({ error: {status: err.statusCode || 500, message: err.message}});
    return res.send({ error: {status: err.statusCode || 500, message: "Something failed:("}});

}

// export default (err, req, res, next) => {
//   console.log('handler: ', err);
//   console.log(
//     `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${
//       req.method
//     } - ${req.ip}`,
//   );
//   res.status(err.statusCode || 500);
//   res.json({
//     message:
//         req.app.get('env') === 'development'
//           ? err.message
//           : 'Unknown error happened',
//   });
// };