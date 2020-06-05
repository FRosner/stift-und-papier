import {GameComponent} from '@src/app/components/game/game.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Player} from '@src/app/models/player';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let player1: Player;
  let player2: Player;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    player1 = component.game.players[0];
    player2 = component.game.players[1];
  });

  it('should render ownerless edges grey', () => {
    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual('#ccc');
  });

  it('should change the owner of an edge on click and move to the next player', () => {
    const currentPlayer = component.currentPlayer;
    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    edge.triggerEventHandler('click', null);
    expect(component.game.graph.edges.find(e => e.owner === currentPlayer))
        .toBeTruthy();
    expect(component.currentPlayer === currentPlayer).toEqual(false);
  });

  it('should render player edges with the respective color', () => {
    component.game.graph.edges[0].owner = player1;
    fixture.detectChanges();

    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual(player1.color);
  });

  it('should render ownerless squares with the respective color', () => {
    const edge = fixture.debugElement.query(By.css('#square-0-0'));
    expect(edge.attributes['fill']).toEqual('#ccc');
  });

  it('should render player squares with the respective color', () => {
    const edge = fixture.debugElement.query(By.css('#square-0-0'));
    component.game.squares[0].owner = player1;
    fixture.detectChanges();
    expect(edge.attributes['fill']).toEqual(player1.color);
  });

  it('should render the score', () => {
    const score1 = fixture.debugElement.query(By.css('#score-0'));
    const score2 = fixture.debugElement.query(By.css('#score-1'));
    player1.score = 5;
    player2.score = 3;
    fixture.detectChanges();
    expect(score1.nativeElement.textContent.trim()).toEqual('Alice: 5');
    expect(score2.nativeElement.textContent.trim()).toEqual('Bob: 3');
  });

  it('should behave correctly after closing a section', () => {
    expect(component.currentPlayer === player1);
    drawEdge(player1, 0, 0, 1, 0);
    drawEdge(player1, 1, 0, 1, 1);
    drawEdge(player1, 0, 1, 1, 1);
    drawEdge(player1, 0, 0, 0, 1);
    expect(component.game.squares[0].owner).toEqual(player1);
    expect(player1.score).toEqual(1);
    expect(component.currentPlayer === player2);
  });

  it('should not change the owner squares that already have an owner', () => {
    // TODO but needs multiplayer capabilities
  });

  function drawEdge(p: Player, x1: number, y1: number, x2: number, y2: number) {
    component.drawEdge(
        component.game.graph.edges.find(e =>
            e.source.x === x1 && e.source.y === y1 && e.target.x === x2 && e.target.y === y2,
        ),
        p,
    );
  }
});
