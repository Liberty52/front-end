#!bin/bash

echo "api gateway server health check"
curl http://13.125.49.218:8080/actuator/health

echo ""
echo "check auth server"
curl http://3.37.87.152:8080/actuator/health

echo ""
echo "check product server"
curl http://43.200.181.190:8080/actuator/health