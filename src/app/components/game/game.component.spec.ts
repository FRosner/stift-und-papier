import {GameComponent} from '@src/app/components/game/game.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Player} from '@src/app/models/player';
import {GameService} from '@src/app/services/game.service';
import {AuthService} from '@src/app/services/auth.service';
import {from} from 'rxjs';
import {Game} from '@src/app/models/game';
import {Graph} from '@src/app/models/graph';
import {Square} from '@src/app/models/square';
import {User} from '@src/app/models/user';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let player1: Player;
  let player2: Player;
  const gameService = jasmine.createSpyObj('GameService', ['getGame', 'setGame']);
  const authService = jasmine.createSpyObj('AuthService', ['getUser', 'googleSignin', 'signOut']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        {provide: GameService, useValue: gameService},
        {provide: AuthService, useValue: authService},
      ],
    })
        .compileComponents();
  }));

  beforeEach(async () => {
    const graph = Graph.initialize(5, 5);
    player1 = new Player(0, 'Alice', 'royalblue', 0);
    player2 = new Player(1, 'Bob', '#F08080', 0);
    gameService.getGame.and.returnValue(from(Promise.resolve(
        new Game(
            '1234',
            graph,
            Square.fromGraph(graph),
            [
              player1,
              player2,
            ],
            0,
        ),
    )));
    authService.getUser.and.returnValue(from(Promise.resolve(
        <User>{
          uid: '1',
          email: 'e@ma.il',
        },
    )));
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    await component.onlineGame$.toPromise();
    fixture.detectChanges();
  });

  it('should render ownerless edges grey', () => {
    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual('#ccc');
  });

  it('should change the owner of an edge on click and move to the next player', () => {
    const currentPlayer = component.currentPlayer(component.game$.value);
    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    edge.triggerEventHandler('click', null);
    expect(component.game$.value.graph.edges.find(e => e.owner.id === currentPlayer.id))
        .toBeTruthy();
    expect(component.currentPlayer(component.game$.value) === currentPlayer).toEqual(false);
  });

  it('should render player edges with the respective color', () => {
    component.game$.value.graph.edges[0].owner = player1;
    fixture.detectChanges();

    const edge = fixture.debugElement.query(By.css('#edge-0-0-1-1'));
    expect(edge.attributes['stroke']).toEqual(player1.color);
  });

  it('should render ownerless squares with the respective color', () => {
    const edge = fixture.debugElement.query(By.css('#square-0-0'));
    expect(edge.attributes['fill']).toEqual('#ccc');
  });

  it('should render player squares with the respective color', () => {
    component.game$.value.squares[0].owner = player1;
    component.game$.next(component.game$.value);
    fixture.detectChanges();
    const square = fixture.debugElement.query(By.css('#square-0-0'));
    expect(square.attributes['fill']).toEqual(player1.color);
  });

  it('should render the score', () => {
    component.game$.value.players[0].score = 5;
    component.game$.value.players[1].score = 3;
    component.game$.next(component.game$.value);
    fixture.detectChanges();
    const score1 = fixture.debugElement.query(By.css('#score-0'));
    const score2 = fixture.debugElement.query(By.css('#score-1'));
    expect(score1.nativeElement.textContent.trim()).toEqual('Alice: 5');
    expect(score2.nativeElement.textContent.trim()).toEqual('Bob: 3');
  });

  it('should behave correctly after closing a section', () => {
    drawEdge(0, 0, 1, 0);
    drawEdge(1, 0, 1, 1);
    drawEdge(0, 1, 1, 1);
    drawEdge(0, 0, 0, 1);
    expect(component.game$.value.squares[0].owner.id).toEqual(player2.id);
    expect(component.game$.value.players[1].score).toEqual(1);
  });

  it('should not change the owner squares that already have an owner', () => {
    // TODO but needs multiplayer capabilities
  });

  function drawEdge(x1: number, y1: number, x2: number, y2: number) {
    component.drawEdge(
        component.game$.value.graph.edges.find(e =>
            e.source.x === x1 && e.source.y === y1 && e.target.x === x2 && e.target.y === y2,
        ),
        component.game$.value,
    );
  }
});
