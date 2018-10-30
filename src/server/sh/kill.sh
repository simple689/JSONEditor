# ! /bin/bash

port=6989
# echo $port

# lsof -i:"$port"
idListStr=`lsof -i:"$port" | awk '{print $2}'`
# echo $idListStr

idList=(${idListStr// / })
len=${#idList[@]}
# echo $len

echo "---------------"
for((i=1;i<$len;i++));
do
id=${idList[i]}
kill -9 $id
echo "killed $id"
done
echo "---------------"
