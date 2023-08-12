# SEMI1-2S2023
## Laboratorio de seminario de sistemas 1 
### Seccion A


<!-- Ejemplo de politica S3 -->

### Estructura de una politica S3
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "{cambiar por el arn de su bucket}/*"
    }
  ]
}
```

### Ejemplo
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::ejemplosemi/*"
    }
  ]
}

```
