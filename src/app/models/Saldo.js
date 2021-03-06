import Sequelize, { Model } from 'sequelize';
import Stock from './Stock';
import Vendas from './Vendas';
import Devolucao from './Devolucao';
import Produto from './Produto';

class Saldo extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },
              venda_id:{
                type: Sequelize.INTEGER,
                allowNull: true,
                references:{
                  model: 'vendas',
                  key: 'id'
                }
              },
              devolucao_id:{
                type: Sequelize.INTEGER,
                allowNull: true,
                references:{
                  model: 'devolucao',
                  key: 'id'
                }
              },
              stock_id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                  model: 'stock',
                  key: 'id'
                }
              },
              produto_id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                references:{
                  model: 'produto',
                  key: 'id'
                }
              },
              quantidade: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
        },{
            sequelize,
            tableName: 'saldo'
        });

        return this;
    }

    static associate(sequelize){
        Stock.hasMany(Saldo, {
            foreignKey: 'stock_id'
        });
        
        this.belongsTo(Stock,{
            foreignKey: 'stock_id'
        });

        Vendas.hasMany(Saldo,{
            foireingKey: 'saldo_id'
        });

        Saldo.belongsTo(Vendas, {
            foireingKey: 'saldo_id'
        });

        Devolucao.hasMany(Saldo,{
          foireingKey: 'saldo_id'
      });

      Saldo.belongsTo(Devolucao, {
          foireingKey: 'saldo_id'
      });

      Saldo.belongsTo(Produto,{
        foireingKey: 'produto_id'
    });

    Produto.hasMany(Saldo, {
        foireingKey: 'produto_id'
    });
    }
}

export default Saldo;