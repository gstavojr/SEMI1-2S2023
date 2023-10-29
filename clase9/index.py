from flask import Flask, jsonify
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return jsonify({'message': 'Seminario de sistemas 1 -2s2023'})
  
  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)