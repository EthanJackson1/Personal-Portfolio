import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('visitor-counter')

def lambda_handler(event, context):
    # Get the HTTP method from the request
    method = event.get('httpMethod')

    if method == 'POST':
        # INCREMENT logic
        response = table.update_item(
            Key={'id': 'visitors'},
            UpdateExpression='ADD #count :inc',
            ExpressionAttributeNames={'#count': 'count'},
            ExpressionAttributeValues={':inc': 1},
            ReturnValues='UPDATED_NEW'
        )
        count_value = response['Attributes']['count']
    else:
        # GET logic (Read only)
        response = table.get_item(Key={'id': 'visitors'})
        # Fallback to 0 if the item doesn't exist yet
        count_value = response.get('Item', {}).get('count', 0)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,GET,POST'
        },
        'body': json.dumps({'count': int(count_value)})
    }