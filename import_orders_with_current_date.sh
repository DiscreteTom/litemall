#!/bin/bash

# 设置MySQL连接信息
DB_USER="root"
DB_PASS="password"
DB_NAME="litemall"
SQL_FILE="/home/ubuntu/litemall/litemall-db/sql/mock_order_data.sql"
TEMP_SQL_FILE="/tmp/modified_order_data.sql"

# 获取当前日期
CURRENT_DATE=$(date +"%Y-%m-%d")
CURRENT_DATETIME=$(date +"%Y-%m-%d %H:%M:%S")

# 检查SQL文件是否存在
if [ ! -f "$SQL_FILE" ]; then
    echo "错误: SQL文件 $SQL_FILE 不存在!"
    exit 1
fi

# 创建临时SQL文件，替换所有日期为当前日期
cat "$SQL_FILE" | sed -E "s/'[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}'/'$CURRENT_DATETIME'/g" | \
                  sed -E "s/'[0-9]{4}-[0-9]{2}-[0-9]{2}'/'$CURRENT_DATE'/g" > "$TEMP_SQL_FILE"

echo "已将所有订单日期修改为当前日期: $CURRENT_DATE"

# 导入修改后的SQL文件到MySQL
echo "正在导入数据到MySQL..."
mysql -h127.0.0.1 -P3306 -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$TEMP_SQL_FILE"

# 检查导入是否成功
if [ $? -eq 0 ]; then
    echo "数据导入成功!"
else
    echo "数据导入失败!"
    exit 1
fi

# 删除临时文件
rm -f "$TEMP_SQL_FILE"
echo "临时SQL文件已删除"

echo "完成!"