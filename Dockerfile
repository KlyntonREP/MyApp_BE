FROM node:18-alpine
WORKDIR /app
EXPOSE 3030
COPY . ./
RUN npm ci --include=prod
# RUN ls -a
RUN npm run build
CMD [ "npm", "run", "start:prod" ]


# Added by Google
ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBFVtayVx4W67jCe9J3TyiqAzOeEXPgHxHCklzNTSMVhVTpkWYU60tch1eamI9P6TWYjQwZnfBcIYIoKqggyryE0= google-ssh {"userName":"azeezade04@gmail.com","expireOn":"2024-02-27T19:09:42+0000"}
# Added by Google
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAFY5UJhR/ROicTkGgAbiSIkghBInWsvnwe3D1t+dPwt6MnzF1UuhFbEUir+3sBGeoUApHBbpPK+hhXNpT8PgTUhmiEdULuTOIHhJI1tqyXgUDFBKDAEhBwX5LZplLl10YiVGRUFEvOT7jnDDpvEMyRFH0+D6zQQvNzs7wBC5LtuT0d3ZaMzAzmo2a0DPbCIZorLVIKxcY7dmSPe8nnIwyHHsjZslWIuUbbkSGJ119ZR4kzKcolOSPkDIliwXTPJK3A/gw0tqSzKdouxzzUrqJjKfljY/o/5ryPSze1WJI9TGi5F8fAoruk2MmGX1T5WnLC9MIdCsHJIgzWCbMyqEnPc= google-ssh {"userName":"azeezade04@gmail.com","expireOn":"2024-02-27T19:09:57+0000"}